using Hl7.Fhir.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Spark.Engine;
using Spark.Engine.Core;
using Spark.Service;

namespace Pasientdata.Api.Controllers
{
    [Route("fhir/[controller]"), ApiController, EnableCors]
    public class SystemController : ControllerBase
    {
        private readonly IFhirService _fhirService;
        private readonly SparkSettings _settings;

        public SystemController(IFhirService fhirService, SparkSettings settings)
        {
            _fhirService = fhirService;
            _settings = settings;
        }

        [HttpGet, Route("metadata")]
        public ActionResult<FhirResponse> Metadata()
        {
            // TODO: Create own Capability Statement specific to this server's implementation
            return _fhirService.CapabilityStatement(_settings.Version);
        }

        [HttpOptions, Route("")]
        public ActionResult<FhirResponse> Options()
        {
            // TODO: Create own Capability Statement specific to this server's implementation
            return _fhirService.CapabilityStatement(_settings.Version);
        }

        [HttpPost, Route("")]
        public FhirResponse Transaction(Bundle bundle)
        {
            return _fhirService.Transaction(bundle);
        }
    }
}